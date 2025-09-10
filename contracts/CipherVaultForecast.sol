// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import { SepoliaConfig } from "@fhevm/solidity/config/ZamaConfig.sol";
import { euint32, externalEuint32, euint8, ebool, FHE } from "@fhevm/solidity/lib/FHE.sol";

contract CipherVaultForecast is SepoliaConfig {
    using FHE for *;
    
    struct Forecast {
        euint32 forecastId;
        euint32 targetAmount;
        euint32 currentAmount;
        euint32 investorCount;
        bool isActive;
        bool isVerified;
        string title;
        string description;
        address creator;
        uint256 startTime;
        uint256 endTime;
    }
    
    struct Investment {
        euint32 investmentId;
        euint32 amount;
        address investor;
        uint256 timestamp;
    }
    
    struct Result {
        euint32 resultId;
        euint32 result;
        bool isVerified;
        string reportHash;
        address reporter;
        uint256 timestamp;
    }
    
    mapping(uint256 => Forecast) public forecasts;
    mapping(uint256 => Investment) public investments;
    mapping(uint256 => Result) public results;
    mapping(address => euint32) public userReputation;
    
    uint256 public forecastCounter;
    uint256 public investmentCounter;
    uint256 public resultCounter;
    
    address public owner;
    address public verifier;
    
    event ForecastCreated(uint256 indexed forecastId, address indexed creator, string title);
    event InvestmentMade(uint256 indexed investmentId, uint256 indexed forecastId, address indexed investor, uint32 amount);
    event ResultReported(uint256 indexed resultId, uint256 indexed forecastId, address indexed reporter);
    event ForecastVerified(uint256 indexed forecastId, bool isVerified);
    event ReputationUpdated(address indexed user, uint32 reputation);
    
    constructor(address _verifier) {
        owner = msg.sender;
        verifier = _verifier;
    }
    
    function createForecast(
        string memory _title,
        string memory _description,
        uint256 _targetAmount,
        uint256 _duration
    ) public returns (uint256) {
        require(bytes(_title).length > 0, "Forecast title cannot be empty");
        require(_duration > 0, "Duration must be positive");
        
        uint256 forecastId = forecastCounter++;
        
        forecasts[forecastId] = Forecast({
            forecastId: FHE.asEuint32(0), // Will be set properly later
            targetAmount: FHE.asEuint32(0), // Will be set to actual value via FHE operations
            currentAmount: FHE.asEuint32(0),
            investorCount: FHE.asEuint32(0),
            isActive: true,
            isVerified: false,
            title: _title,
            description: _description,
            creator: msg.sender,
            startTime: block.timestamp,
            endTime: block.timestamp + _duration
        });
        
        emit ForecastCreated(forecastId, msg.sender, _title);
        return forecastId;
    }
    
    function makeInvestment(
        uint256 forecastId,
        externalEuint32 amount,
        bytes calldata inputProof
    ) public payable returns (uint256) {
        require(forecasts[forecastId].creator != address(0), "Forecast does not exist");
        require(forecasts[forecastId].isActive, "Forecast is not active");
        require(block.timestamp <= forecasts[forecastId].endTime, "Forecast has ended");
        
        uint256 investmentId = investmentCounter++;
        
        // Convert externalEuint32 to euint32 using FHE.fromExternal
        euint32 internalAmount = FHE.fromExternal(amount, inputProof);
        
        investments[investmentId] = Investment({
            investmentId: FHE.asEuint32(0), // Will be set properly later
            amount: internalAmount,
            investor: msg.sender,
            timestamp: block.timestamp
        });
        
        // Update forecast totals
        forecasts[forecastId].currentAmount = FHE.add(forecasts[forecastId].currentAmount, internalAmount);
        forecasts[forecastId].investorCount = FHE.add(forecasts[forecastId].investorCount, FHE.asEuint32(1));
        
        emit InvestmentMade(investmentId, forecastId, msg.sender, 0); // Amount will be decrypted off-chain
        return investmentId;
    }
    
    function submitResult(
        uint256 forecastId,
        euint32 result,
        string memory reportHash
    ) public returns (uint256) {
        require(forecasts[forecastId].creator == msg.sender, "Only creator can submit result");
        require(forecasts[forecastId].isActive, "Forecast must be active");
        require(block.timestamp > forecasts[forecastId].endTime, "Forecast must be ended");
        
        uint256 resultId = resultCounter++;
        
        results[resultId] = Result({
            resultId: FHE.asEuint32(0), // Will be set properly later
            result: result,
            isVerified: false,
            reportHash: reportHash,
            reporter: msg.sender,
            timestamp: block.timestamp
        });
        
        emit ResultReported(resultId, forecastId, msg.sender);
        return resultId;
    }
    
    function verifyForecast(uint256 forecastId, bool isVerified) public {
        require(msg.sender == verifier, "Only verifier can verify forecasts");
        require(forecasts[forecastId].creator != address(0), "Forecast does not exist");
        
        forecasts[forecastId].isVerified = isVerified;
        emit ForecastVerified(forecastId, isVerified);
    }
    
    function updateReputation(address user, euint32 reputation) public {
        require(msg.sender == verifier, "Only verifier can update reputation");
        require(user != address(0), "Invalid user address");
        
        userReputation[user] = reputation;
        emit ReputationUpdated(user, 0); // FHE.decrypt(reputation) - will be decrypted off-chain
    }
    
    function getForecastInfo(uint256 forecastId) public view returns (
        string memory title,
        string memory description,
        uint8 targetAmount,
        uint8 currentAmount,
        uint8 investorCount,
        bool isActive,
        bool isVerified,
        address creator,
        uint256 startTime,
        uint256 endTime
    ) {
        Forecast storage forecast = forecasts[forecastId];
        return (
            forecast.title,
            forecast.description,
            0, // FHE.decrypt(forecast.targetAmount) - will be decrypted off-chain
            0, // FHE.decrypt(forecast.currentAmount) - will be decrypted off-chain
            0, // FHE.decrypt(forecast.investorCount) - will be decrypted off-chain
            forecast.isActive,
            forecast.isVerified,
            forecast.creator,
            forecast.startTime,
            forecast.endTime
        );
    }
    
    function getInvestmentInfo(uint256 investmentId) public view returns (
        uint8 amount,
        address investor,
        uint256 timestamp
    ) {
        Investment storage investment = investments[investmentId];
        return (
            0, // FHE.decrypt(investment.amount) - will be decrypted off-chain
            investment.investor,
            investment.timestamp
        );
    }
    
    function getResultInfo(uint256 resultId) public view returns (
        uint8 result,
        bool isVerified,
        string memory reportHash,
        address reporter,
        uint256 timestamp
    ) {
        Result storage resultData = results[resultId];
        return (
            0, // FHE.decrypt(resultData.result) - will be decrypted off-chain
            resultData.isVerified,
            resultData.reportHash,
            resultData.reporter,
            resultData.timestamp
        );
    }
    
    function getUserReputation(address user) public view returns (uint8) {
        return 0; // FHE.decrypt(userReputation[user]) - will be decrypted off-chain
    }
    
    function withdrawFunds(uint256 forecastId) public {
        require(forecasts[forecastId].creator == msg.sender, "Only creator can withdraw");
        require(forecasts[forecastId].isVerified, "Forecast must be verified");
        require(block.timestamp > forecasts[forecastId].endTime, "Forecast must be ended");
        
        // Transfer funds to creator
        // Note: In a real implementation, funds would be transferred based on decrypted amount
        forecasts[forecastId].isActive = false;
        
        // For now, we'll transfer a placeholder amount
        // payable(msg.sender).transfer(amount);
    }
}
