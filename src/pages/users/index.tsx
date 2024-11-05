import { faker } from '@faker-js/faker';

const getUsers =  () => new Array(100).fill(0).map((id : number, i : number) => {
    return {
        id : i + 1,
        name : faker.person.fullName(),
        email : faker.internet.email(),
        role : "USER",
    }
} )

const Users = () => {

    const users = getUsers();

    return (
        <>
            <section>
                userss
            </section>
        </>
    )
}   

export default Users;