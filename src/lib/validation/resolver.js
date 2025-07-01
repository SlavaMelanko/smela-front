import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

const createResolver = schema => yupResolver(yup.object().shape(schema))

export default createResolver
