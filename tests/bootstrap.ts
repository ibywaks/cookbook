import dbInit from '../src/db/init'

(async function () {
    console.log('++++++ Bootstraping Tests +++++++')
    await dbInit()
})()
