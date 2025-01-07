//oturum açık kalma ya da belirli bir süre açık tutma islemlerini burdan kontrol ediyoruz.

import passport from "passport";

const Session = passport.authenticate("jwt", {session: false})

export default Session;