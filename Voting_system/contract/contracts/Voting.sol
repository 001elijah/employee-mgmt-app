// SPDX-License-Identifier: MIT

pragma solidity 0.8.17;

contract VotingSystem {
    address public admin;

    struct Election {
        string info;
        string[] candidates;
        uint startDate;
        uint endDate;
        mapping(address => uint) votes;
        mapping(uint => uint) results;
    }

    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin can call this function");
        _;
    }

    modifier electionExists(uint _electionId) {
        require(_electionId < elections.length, "Invalid election ID.");
        _;
    }

    modifier hasNotVoted(uint _electionId) {
        require(
            elections[_electionId].votes[msg.sender] == 0,
            "Address has already voted."
        );
        _;
    }

    modifier afterStartDate(uint _electionId) {
        require(
            block.timestamp >= elections[_electionId].startDate,
            "Voting has not started yet."
        );
        _;
    }

    modifier beforeEndDate(uint _electionId) {
        require(
            block.timestamp < elections[_electionId].endDate,
            "Voting has ended."
        );
        _;
    }

    Election[] public elections;

    constructor() {
        admin = msg.sender;
    }

    event ElectionCreated(uint indexed electionID, string info);
    event Voted(
        address indexed voter,
        uint indexed electionID,
        uint candidateIndex
    );

    function createElection(
        string memory _info,
        uint _startDate,
        uint _endDate,
        string[] memory _candidates
    ) public onlyAdmin {
        require(
            _candidates.length >= 2,
            "At least two candidates are required."
        );

        require(_endDate > _startDate, "End date must be after start date.");

        require(
            _startDate > block.timestamp,
            "Start date must be in the future."
        );

        Election storage newElection = elections.push();

        newElection.info = _info;
        newElection.candidates = _candidates;
        newElection.startDate = _startDate;
        newElection.endDate = _endDate;

        emit ElectionCreated(elections.length - 1, _info);
    }

    function vote(
        uint _electionId,
        uint _candidateIndex
    )
        public
        electionExists(_electionId)
        afterStartDate(_electionId)
        beforeEndDate(_electionId)
        hasNotVoted(_electionId)
    {
        require(
            _candidateIndex < elections[_electionId].candidates.length,
            "Invalid candidate index."
        );

        elections[_electionId].votes[msg.sender] = _candidateIndex + 1;
        elections[_electionId].results[_candidateIndex]++;

        emit Voted(msg.sender, _electionId, _candidateIndex);
    }

    function getResult(
        uint _electionId,
        uint _candidateIndex
    ) public view electionExists(_electionId) returns (uint) {
        require(
            _candidateIndex < elections[_electionId].candidates.length,
            "Invalid candidate index."
        );
        return elections[_electionId].results[_candidateIndex];
    }

    function getCandidates(
        uint _electionId
    ) public view electionExists(_electionId) returns (string[] memory) {
        return elections[_electionId].candidates;
    }

    string public testString;

    function setTestString(string memory _data) public {
        testString = _data;
    }

    function getTestString() public view returns (string memory) {
        return testString;
    }

    function getElectionInfo(
        uint _electionId
    ) public view electionExists(_electionId) returns (string memory) {
        return elections[_electionId].info;
    }
}
