<!-- Answers to the Short Answer Essay Questions go here -->

1. What is the purpose of using _sessions_? <br>
    We face a problem when making API calls: http is stateless, meaning that it doesn't remember things between requests. Sessions gives us a way to rectify that. Sessions allow the server to persist info about the client. For our purposes, we use sessions to remember authentication details. <br> <br> 

2. What does bcrypt do to help us store passwords in a secure manner. <br>
    Instead of saving passwords in plain text (which is a recipe for disaster), we have two options available: encryption and hashing. Bcrypt uses the latter. Hashing is a pure function in which: parameters + input = hash. 
    <br><br>

3. What does bcrypt do to slow down attackers? <br>
    In order to slow down attackers, bcrypt can add time to our security algorithm to produce a Key Derivation Function. Bcrypt hashes the password over multiple rounds. This means a hacker needs to have the hash, know the hashing algorithm used, and how many rounds were used to generate the hash to break it.
    <br><br>

4. What are the three parts of the JSON Web Token? <br>
    JWTs are composed of a header, payload, and signature. The header declares the type (JWT) and the hashing algorithm. The payload makes claims about the issuer, subject, audience, etc. The signature is a hash of the header, payload, and secret. All of this is base 64 encoded.