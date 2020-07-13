const ItemsModel = require('../models/Item');

var items = [
    {
        title:"Canyon Sprectral",
        description:"The Spectral brings the best mixture of traction, control, handling and playfulness together into a simple and versatile trail-taming tool.",
        imageURL:"https://images.unsplash.com/photo-1566480047210-b10eaa1f8095?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
        price:2899
    },
    {
        title:"Marverk Drone",
        description:"The L100 6 Axis Dual GPS Drone is upgraded with the latest image and video transmission technology, equipped with advanced 1080P FHD 5G Wi-Fi Camera.",
        imageURL:"https://images.unsplash.com/photo-1508444845599-5c89863b1c44?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
        price:180.99
    },
    {
        title:"Orange 8 Tent",
        description:"When it's time to head home, the tent packs up into an included expandable carrying bag until you're off on your next adventure.",
        imageURL:"https://images.unsplash.com/photo-1506535995048-638aa1b62b77?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
        price:99.99
    },
    {
        title:"Gerber Axe",
        description:"Gerber Axes are designed with PTFE coating for clean chopping every time. ",
        imageURL:"https://images.unsplash.com/photo-1554341542-66697b9010d9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
        price:99.99
    },
    {
        title:"Niner Backpack",
        description:"You heard it here first, folks, the Mountain Hardwear Scrambler 35L Backpack was designed to assist with steep rocky approaches to your favorite crags—to scramble, if you will. ",
        imageURL:"https://images.unsplash.com/photo-1537430802614-118bf14be50c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
        price:389.89
    },
    {
        title:"Tenet Hammock",
        description:"Camping Hammock with Mosquito Net Double Hammock Outdoor Ultra Light Portable Breathable Anti-Mosquito Parachute Nylon with Carabiners and Tree Straps 2 person Camping Hiking Hunting Army Green.",
        imageURL:"https://images.unsplash.com/photo-1445307806294-bff7f67ff225?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
        price:23.78
    }
]
ItemsModel.find({},(err,itemsFound)=>{
    if(err){
        console.log(err);
    }else if(itemsFound.length<1){
        items.forEach(element=>{
            var newItem = new ItemsModel(element);
            newItem.save((err,saved)=>{
                if(err){
                    console.log(err);
                }
            });
        });
    }
});

