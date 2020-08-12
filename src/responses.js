"use strict";

global.createSuccessResponse = (res, data, code = 200, isPaginated = false) => {
    if(isPaginated || (data &&  data.docs)){
        data.data = data.docs;
        delete data.docs;
        return res.status(code).send(data);
    }
    return res.status(code).send({data});
};

global.createErrorResponse = (res, error = "Oops. An Error Occurred", code = 500) => {
    return res.status(code).send({error});
};