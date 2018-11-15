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

exports.postHandler = async (event, context) => {
    const data = JSON.parse(event.body)

    if (!data.id || !data.title || !data.img_url || !data.price) {
        response = {
            'statusCode': 422,
            'body': JSON.stringify("Missing required fields")
        }
    } else {
        response = {
            'statusCode': 200,
            'body': JSON.stringify("Product created")
        };
    }

    return response;
};

exports.putHandler = async (event, context) => {
    const data = JSON.parse(event.body)
    const id = data.id;
    console.log(typeof(id));

    if (id) {
        const productIndex = db.findIndex(el => el.id === id);
        const productFound = db[productIndex];

        const updatedProduct = {
            id: productFound.id,
            title: data.title || productFound.title,
            price: data.price || productFound.price,
            img_url: data.img_url || productFound.img_url
        };

        db.splice(productIndex, 1, updatedProduct);

        console.log(db);

        response = {
            'statusCode': 200,
            'body': JSON.stringify("Product updated")
        };
    }

    // TODO
    // ELSE

    return response;
};


