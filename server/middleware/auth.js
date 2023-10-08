import jwt, { decode } from 'jsonwebtoken';

const auth = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const isCustomAuth = token.length < 500;

        let decodedData;

        if(token && isCustomAuth) {
            decodedData = jwt.verify(token, 'test');

            req.userId = decodedData?.id;
        } else {
            decodedData = jwt.decode(token);

            req.userId = decodedData?.sub; //google's name for a specific id that differentiates every single google's user
        }

        next();
    } catch (error) {
        console.log(error);
    }
}

export default auth;