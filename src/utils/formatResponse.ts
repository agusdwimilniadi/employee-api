import Joi from 'joi';

export const formatResponse = (
    success: boolean,
    statusCode: number,
    message: string,
    data: any = null
) => {
    return {
        success,
        statusCode,
        message,
        data,
    };
};
