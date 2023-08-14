const Wallet = require('../instances/firestoreInstance')('wallet')
const Payout = require('../instances/firestoreInstance')('payout')
const { Timestamp, FieldValue } = require('firebase-admin/firestore')

const getWalletBalance = async (req, res) => {
    try {
        const walletDoc = Wallet.doc(req.uid)
        const walletData = await walletDoc.get()
        res.send({ balance: walletData.data().balance })
    } catch (error) {
        console.error(error)
        res.send({ error })
    }
}

const getWalletIncome = async (req, res) => {
    try {
        const walletDoc = Wallet.doc(req.uid)
        const walletData = await walletDoc.get()
        res.send({ dataIncome: walletData.data().dataIncome })
    } catch (error) {
        console.error(error)
        res.send({ error })
    }
}

const getWalletExpense = async (req, res) => {
    try {
        const walletDoc = Wallet.doc(req.uid)
        const walletData = await walletDoc.get()
        res.send({ dataExpense: walletData.data().dataExpense })
    } catch (error) {
        console.error(error)
        res.send({ error })
    }
}

const getWalletAllData = async (req, res) => {
    try {
        const walletDoc = Wallet.doc(req.uid)
        const walletData = await walletDoc.get()
        res.send({ ...walletData.data() })
    } catch (error) {
        console.error(error)
        res.send({ error })
    }
}

const payoutRequest = async (req, res) => {
    try {
        const payoutDoc = Payout.doc()
        await payoutDoc.set({
            payoutId: payoutDoc.id,
            payoutTime: Timestamp.fromDate(new Date()),
            amount: req.body.amount,
            payoutStatus: 'pending',
            driverId: req.uid,
        })
        res.send({ ...req.body })
    } catch (error) {
        console.error(error)
        res.send({ error })
    }
}

module.exports = {
    getWalletBalance,
    getWalletIncome,
    getWalletExpense,
    getWalletAllData,
    payoutRequest,
}
