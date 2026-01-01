import { faker } from "@faker-js/faker";

export class RandomDataGenerator {

    static generateFirstName(): string {
        return faker.person.firstName();
    }

    static generateLastName(): string {
        return faker.person.lastName();
    }

    static generateEmail(): string {
        return faker.internet.email();
    }

    static generateTelephone(): string {
        return faker.phone.number();
    }
    static generatePassword(length: number = 10): string {
        return faker.internet.password({ length, memorable: true });
    }

    static generateStreetName(): string {
        return faker.location.street();
    }

    static generateAddress(): string {
        return faker.location.streetAddress();
    }

    static generateCity(): string {
        return faker.location.city();
    }

    static generateState(): string {
        return faker.location.state();
    }

    static generatePostalCode(): string {
        return faker.location.zipCode();
    }

     static generateCountry(): string {
        return faker.location.country();
    }

}