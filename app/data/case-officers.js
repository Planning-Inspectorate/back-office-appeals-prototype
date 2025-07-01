const { v4: uuidv4 } = require('uuid')
const caseTeams = require('../data/case-teams')

module.exports = [
  { id: uuidv4(), name: 'Peter Parker', emailAddress: 'peter.parker@planninginspectorate.gov.uk', caseTeam: caseTeams[0] },
  { id: uuidv4(), name: 'Tony Stark', emailAddress: 'tony.stark@planninginspectorate.gov.uk', caseTeam: caseTeams[0] },
  { id: uuidv4(), name: 'Bruce Wayne', emailAddress: 'bruce.wayne@planninginspectorate.gov.uk', caseTeam: caseTeams[1] },
  { id: uuidv4(), name: 'Clark Kent', emailAddress: 'clark.kent@planninginspectorate.gov.uk', caseTeam: caseTeams[1] },
  { id: uuidv4(), name: 'Diana Prince', emailAddress: 'diana.prince@planninginspectorate.gov.uk', caseTeam: caseTeams[2] },
  { id: uuidv4(), name: 'Steve Rogers', emailAddress: 'steve.rogers@planninginspectorate.gov.uk', caseTeam: caseTeams[2] },
  { id: uuidv4(), name: 'Natasha Romanoff', emailAddress: 'natasha.romanoff@planninginspectorate.gov.uk', caseTeam: caseTeams[3] },
  { id: uuidv4(), name: 'Wanda Maximoff', emailAddress: 'wanda.maximoff@planninginspectorate.gov.uk', caseTeam: caseTeams[3] },
  { id: uuidv4(), name: 'Stephen Strange', emailAddress: 'stephen.strange@planninginspectorate.gov.uk', caseTeam: caseTeams[4] },
  { id: uuidv4(), name: 'Scott Lang', emailAddress: 'scott.lang@planninginspectorate.gov.uk', caseTeam: caseTeams[4] },
  { id: uuidv4(), name: 'Carol Danvers', emailAddress: 'carol.danvers@planninginspectorate.gov.uk', caseTeam: caseTeams[5] },
  { id: uuidv4(), name: 'Bruce Banner', emailAddress: 'bruce.banner@planninginspectorate.gov.uk', caseTeam: caseTeams[5] },
  { id: uuidv4(), name: 'Barry Allen', emailAddress: 'barry.allen@planninginspectorate.gov.uk', caseTeam: caseTeams[6] },
  { id: uuidv4(), name: 'Hal Jordan', emailAddress: 'hal.jordan@planninginspectorate.gov.uk', caseTeam: caseTeams[6] },
  { id: uuidv4(), name: 'Arthur Curry', emailAddress: 'arthur.curry@planninginspectorate.gov.uk', caseTeam: caseTeams[7] },
  { id: uuidv4(), name: 'Logan Howlett', emailAddress: 'logan.howlett@planninginspectorate.gov.uk', caseTeam: caseTeams[7] },
  { id: uuidv4(), name: 'Jean Grey', emailAddress: 'jean.grey@planninginspectorate.gov.uk', caseTeam: caseTeams[8] },
  { id: uuidv4(), name: 'Ororo Munroe', emailAddress: 'ororo.munroe@planninginspectorate.gov.uk', caseTeam: caseTeams[8] },
  { id: uuidv4(), name: 'Matt Murdock', emailAddress: 'matt.murdock@planninginspectorate.gov.uk', caseTeam: caseTeams[9] },
  { id: uuidv4(), name: 'Jessica Jones', emailAddress: 'jessica.jones@planninginspectorate.gov.uk', caseTeam: caseTeams[9] },
  { id: uuidv4(), name: 'Luke Cage', emailAddress: 'luke.cage@planninginspectorate.gov.uk', caseTeam: caseTeams[10] },
  { id: uuidv4(), name: 'Selina Kyle', emailAddress: 'selina.kyle@planninginspectorate.gov.uk', caseTeam: caseTeams[10] },
  { id: uuidv4(), name: 'Wade Wilson', emailAddress: 'wade.wilson@planninginspectorate.gov.uk', caseTeam: caseTeams[11] },
  { id: uuidv4(), name: 'Charles Xavier', emailAddress: 'charles.xavier@planninginspectorate.gov.uk', caseTeam: caseTeams[11] }
]
