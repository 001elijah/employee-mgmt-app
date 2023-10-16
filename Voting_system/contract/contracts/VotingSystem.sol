// SPDX-License-Identifier: MIT

pragma solidity >=0.4.22 <0.9.0;

contract VotingSystem {
    address public admin;

    struct Election {
        string info;
        string[] candidates;
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
        string[] memory _candidates
    ) public onlyAdmin {
        require(
            _candidates.length >= 2,
            "At least two candidates are required."
        );

        Election storage newElection = elections.push();

        newElection.info = _info;
        newElection.candidates = _candidates;

        emit ElectionCreated(elections.length - 1, _info);
    }

    function vote(
        uint _electionId,
        uint _candidateIndex
    ) public electionExists(_electionId) hasNotVoted(_electionId) {
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
}
