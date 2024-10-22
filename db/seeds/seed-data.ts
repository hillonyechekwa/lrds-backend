import { User } from "src/entities/user.entity";
import { Stylist } from "src/entities/stylist.entity";
import { EntityManager } from "typeorm";
import {faker} from "@faker-js/faker"
// import {v4 as uuid} from 'uuid'
import * as bcrypt from 'bcrypt'
import { Booking } from "src/entities/booking.entity";
import { Service } from "src/entities/service.entity";


export const seedData = async (manager: EntityManager): Promise<void> => {


    await seedUser()
    await seedStylist()
    await seedService()
    await seedBooking()


    async function seedUser() {
        const salt = await bcrypt.genSalt()

        const encryptedPassword = await bcrypt.hash("12345", salt)
        const user = new User()
        user.firstName = faker.person.firstName()
        user.lastName = faker.person.lastName()
        user.username = faker.person.fullName()
        user.email = faker.internet.email()
        user.password = encryptedPassword


        await manager.getRepository(User).save(user)
    }


    async function seedStylist() {
        const salt = await bcrypt.genSalt()

        const encryptedPassword = await bcrypt.hash("12345", salt)
         
        const user = new User()
        user.firstName = faker.person.firstName()
        user.lastName = faker.person.lastName()
        user.username = faker.person.fullName()
        user.email = faker.internet.email()
        user.password = encryptedPassword

        const stylist = new Stylist()
        stylist.user = user
        await manager.getRepository(User).save(user)
        await manager.getRepository(Stylist).save(stylist)
    }


    async function seedService() {
        const salt = await bcrypt.genSalt()

        const encryptedPassword = await bcrypt.hash("12345", salt)
         
        const user = new User()
        user.firstName = faker.person.firstName()
        user.lastName = faker.person.lastName()
        user.username = faker.person.fullName()
        user.email = faker.internet.email()
        user.password = encryptedPassword
        
        const stylist = new Stylist()
        stylist.user = user

        const service = new Service()
        service.name = faker.commerce.product()
        service.price = parseInt(faker.commerce.price())
        const minDuration = 30 * 60 * 100 ///should be 30mins
        const maxDuration = 3 * 60 * 60 * 1000 //*3hrs in milliseconds
        const durationInMs  = faker.number.int({ min: minDuration, max: maxDuration })
        const durationInMinutes = Math.round(durationInMs / (60 * 1000))
        service.duration = durationInMinutes
        console.log(typeof durationInMinutes)
        service.stylist = stylist

        await manager.getRepository(User).save(user)
        await manager.getRepository(Stylist).save(stylist)
        await manager.getRepository(Service).save(service)

    }

 
    async function seedBooking() {
        const salt = await bcrypt.genSalt()

        const encryptedPassword = await bcrypt.hash("12345", salt)
         
        const user = new User()
        user.firstName = faker.person.firstName()
        user.lastName = faker.person.lastName()
        user.username = faker.person.fullName()
        user.email = faker.internet.email()
        user.password = encryptedPassword
        
        const stylist = new Stylist()
        stylist.user = user

        const service = new Service()
        service.stylist = stylist
        service.name = faker.commerce.product()

        const booking = new Booking()
        booking.stylist = stylist
        booking.services = [service]

        await manager.getRepository(User).save(user)
        await manager.getRepository(Stylist).save(stylist)
        await manager.getRepository(Service).save(service)
        await manager.getRepository(Booking).save(booking)
    }
}