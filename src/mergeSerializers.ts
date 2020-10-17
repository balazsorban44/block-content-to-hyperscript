import {defaultSerializers as _defaultSerializers} from 'index'
import {Serializers} from 'serializers'

function isDefined(val) {
  return typeof val !== 'undefined'
}

export type MergeSerializersFn = (
  defaultSerializers?: Partial<Serializers>,
  userSerializers?: Partial<Serializers>
) => Serializers

// Recursively merge/replace default serializers with user-specified serializers
const mergeSerializers: MergeSerializersFn = (defaultSerializers = {}, userSerializers = {}) => {
  return Object.keys(defaultSerializers).reduce((acc, key) => {
    const type = typeof defaultSerializers[key]
    if (type === 'function') {
      acc[key] = isDefined(userSerializers[key]) ? userSerializers[key] : defaultSerializers[key]
    } else if (type === 'object') {
      acc[key] = {...defaultSerializers[key], ...userSerializers[key]}
    } else {
      acc[key] =
        typeof userSerializers[key] === 'undefined' ? defaultSerializers[key] : userSerializers[key]
    }
    return acc
  }, _defaultSerializers)
}

export default mergeSerializers
