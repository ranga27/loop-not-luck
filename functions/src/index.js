import { functions as opportunityFunctions } from './opportunities';
import { functions as candidateFunctions } from './candidates';
import { functions as userFunctions } from './users';

export default {
    ...opportunityFunctions,
    ...candidateFunctions,
    ...userFunctions,
};