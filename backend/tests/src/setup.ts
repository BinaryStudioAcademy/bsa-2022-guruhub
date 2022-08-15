import chai from 'chai';
import chaiJsonSchema from 'chai-json-schema';

import { chaiHttp } from './chai-plugins/chai-plugins';

chai.use(chaiJsonSchema);
chai.use(chaiHttp);

chai.should();
