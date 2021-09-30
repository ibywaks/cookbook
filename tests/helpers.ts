import { agent as _request } from "supertest"

import {get as getApplication} from '../src/index'

export const request = _request(getApplication())