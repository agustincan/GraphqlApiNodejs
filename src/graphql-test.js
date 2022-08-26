import { gql } from 'apollo-server';
import axios from 'axios';

export const typeDefs = gql`
    type Zone {
        id: ID!
        name: String!
    }    
    type Street {
        id: ID!
        name: String!
    }
    type Sump {
        id: ID!
        code: String!
        street : Street
    }

    type Query {
        sumpCount: Int!
        allSumps(code: String!): [Sump]!
        getZoneById(id: ID!): Zone
        getZoneByName(name: String!): Zone
    }

    type Mutation {
        createZone(name: String!): Zone
    }
`

const BASE_ZONE_URL = "http://localhost:3000/api/v1/zone"
const BASE_SUMP_URL = "http://localhost:3000/api/v1/sump"
export const resolvers = {
    Query: {
        sumpCount: () => 11,
        allSumps: async (root, args) => {
            const {data: sumpsFromApi} = await axios.get(`${BASE_SUMP_URL}/?isActive=true`)
            if(!args.code) return sumpsFromApi

            console.log(args.code)
            return sumpsFromApi.filter(s => s.code == args.code)
        },
        getZoneById: async (root, args) => {
            
            const { id } = args
            const { data: zoneFromApi } = await axios.get(`${BASE_ZONE_URL}/get-byid/${id}`)
            
            console.log("zone retrieved", zoneFromApi)
            return zoneFromApi
        },
        getZoneByName: async (root, args) => {
            
            const { name } = args
            const { data: zoneFromApi } = await axios.get(`${BASE_ZONE_URL}/get-byname/${name}`)
            if(!zoneFromApi) throw new UserInputError("Zone does not exists")
            console.log("zone retrieved", zoneFromApi)
            return zoneFromApi
        },
    },
    Mutation: {
        createZone: async (root, args) => {
            const { name } = args
            let newZone = { id: 0, name: name }
            console.log(newZone)
            
            try {
                const { data: zoneFromApi } = await axios.post(`${BASE_ZONE_URL}/`, newZone)
                console.log("zoneFromApi",zoneFromApi)
                return zoneFromApi   
            } catch (error) {
                console.error("error",error)
            }
        }
    }
}