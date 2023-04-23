/*

Diamond uses a single DynamoDB table to store all records, with different key definitions identifying the item type.


Keys for DynamoDB use the following structure:

Person: 
    item_key: person
    item_name: id

Ballpark:
    item_key: ballpark
    item_name: id

Franchise:
    item_key: franchise
    item_name: id
Schedule:
    item_key: schedule-{yearmonth}
    item_name: gameId
Game:
    item_key: game
    item_name: id
*/
