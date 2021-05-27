// In people collection
// #1 Add a person to the collection. You pick the data, but they should have an empty array for children.
db.people.insertOne({
  "first_name": "Michael",
  "last_name": "Scott",
  "email": "m.scott@dundermifflin.com",
  "age": 40,
  "state": "Pennsylvania",
  "children": null
})
    
// #2 Add another person. They should have at least two children.
db.people.insertOne({
    "first_name": "Jim",
    "last_name": "Halpert",
    "email": "j.halpert@dundermifflin.com",
    "age": 36,
    "state": "Pennsylvania",
    "children": [
        {"name": "Philip", "age": 1},
        {"name": "Cici", "age": 3},
    ]
  })
// #3 Update one person named Clarence. He moved from North Dakota to South Dakota. -- NOT SURE THIS WORKED
db.people.updateOne({first_name: "Clarence"},
{$set: {state: "South Dakota"}})

// #4 Update Rebecca Hayes. Remove her email address.
db.people.updateOne({first_name: "Rebecca", last_name: "Hayes"},
{$unset:{email:1}})

// #5 Update everyone from Missouri. They all had a birthday today, so add one to their age. (expect 4 matches)
db.people.updateMany({state: "Missouri"},
{$inc: {age:1 }})

// #6 Jerry Baker has updated information. Replace with a new document:
// { first_name: "Jerry", last_name: "Baker-Mendez", email: "jerry@classic.ly", gender:"Male", age: 28, state: "Vermont", "children": [{name: "Alan", age: 18}, {name: "Jenny", age: 3}] }
db.people.replaceOne({first_name: "Jerry",last_name: "Baker"},
{ first_name: "Jerry", last_name: "Baker-Mendez", email: "jerry@classic.ly", gender:"Male", age: 28, state: "Vermont", "children": [{name: "Alan", age: 18}, {name: "Jenny", age: 3}] })

// #7 Delete Wanda Bowman.
db.people.deleteOne({first_name: "Wanda", last_name:"Bowman"})

// #8 Delete everyone who does not have an email address specified. (expect 37 matches)
db.people.deleteMany({email: null})

// In submissions collection
// #9 Add several documents to a new submissions collection. Do it all in one command. (Remember, MongoDB will create the collection for you. Just start adding documents.)
// title: "The River Bend", upvotes: 10, downvotes: 2, artist: <ID of Anna Howard>
// title: "Nine Lives", upvotes: 7, downvotes: 0, artist: <ID of Scott Henderson>
// title: "Star Bright", upvotes: 19, downvotes: 3, artist: <ID of Andrea Burke>
// title: "Why Like This?", upvotes: 1, downvotes: 5, artist: <ID of Steven Marshall>
// title: "Non Sequitur", upvotes: 11, downvotes: 1, artist: <ID of Gerald Bailey>
db.submissions.insertMany([
{title: "The River Bend", upvotes: 10, downvotes: 2, artist: ObjectId("60ae89a1ca7bb07a8d9506f8") },
{title: "Nine Lives", upvotes: 7, downvotes: 0, artist: ObjectId("60ae89a1ca7bb07a8d950726")},
{title: "Star Bright", upvotes: 19, downvotes: 3, artist: ObjectId("60ae89a1ca7bb07a8d9507a9")},
{title: "Why Like This?", upvotes: 1, downvotes: 5, artist: ObjectId("60ae89a1ca7bb07a8d95072f")},
{title: "Non Sequitur", upvotes: 11, downvotes: 1, artist: ObjectId("60ae89a1ca7bb07a8d9506f6")}])

// #10 Add 2 upvotes for "The River Bend".
db.submissions.updateOne({title: "The River Bend"},
{$inc: {upvotes:2}})


// #11 Add a field round2 = true to all submissions with at least 10 upvotes. (expect 3 matches)
db.submissions.find({upvotes: {$gte: 10 }})
db.submissions.updateMany({ upvotes: { $gte: 10 } }, { $set: { round2: true } })


