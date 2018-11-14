let db = [
    {
        id: 1,
        title: 'Little bag of happiness',
        price: 1250,
        img_url: 'bag_happiness.png'
    },
    {
        id: 2,
        title: 'Personalised scarf',
        price: 2100,
        img_url: 'scarf_personlised.png'
    }
];
let response;

exports.lambdaHandler = async (event, context) => {
    if (event.queryStringParameters === null) {
        response =  {
            'statusCode': 200,
            'body': JSON.stringify(db)
        };
    } else if (event.queryStringParameters.hasOwnProperty('id')) {
        const productID = event.queryStringParameters.id;
        const productIndex = db.findIndex(el => el.id.toString() === productID);
        response = {
            'statusCode': 200,
            'body': JSON.stringify(db[productIndex])
        };
    } else {
        response = {
            'statusCode': 200,
            'body': JSON.stringify("Don't know that one sorry")
        };
    };

    return response;
};


