const Wallet = require('../instances/firestoreInstance')('wallet')
const Payout = require('../instances/firestoreInstance')('payout')
const { Timestamp, FieldValue } = require('firebase-admin/firestore')

const getWalletBalance = async (req, res) => {
    try {
        const walletDoc = Wallet.doc(req.uid)
        const walletData = await walletDoc.get()
        res.send({ message: 'Successfully get balance', data: { balance: walletData.data().balance } })
    } catch (error) {
        console.error(error)
        res.status(500).send({ error })
    }
}

const getWalletIncome = async (req, res) => {
    try {
        const walletDoc = Wallet.doc(req.uid)
        const walletData = await walletDoc.get()
        res.send({ message: 'Successfully get income', data: { dataIncome: walletData.data().dataIncome } })
    } catch (error) {
        console.error(error)
        res.status(500).send({ error })
    }
}

const getWalletExpense = async (req, res) => {
    try {
        const walletDoc = Wallet.doc(req.uid)
        const walletData = await walletDoc.get()
        res.send({ message: 'Successfully get income', data: { dataExpense: walletData.data().dataExpense } })
    } catch (error) {
        console.error(error)
        res.status(500).send({ error })
    }
}

const getWalletAllData = async (req, res) => {
    try {
        const walletDoc = Wallet.doc(req.uid)
        const walletData = await walletDoc.get()
        res.send({ message: 'Successfully get all data', data: walletData.data() })
    } catch (error) {
        console.error(error)
        res.status(500).send({ error })
    }
}

const payoutRequest = async (req, res) => {
    try {
        const payoutDoc = Payout.doc()
        const walletData = await Wallet.doc(req.uid).get()
        const amount = req.body.amount
        const balance = walletData.data().balance
        if (balance < amount)
            res.send({ message: "Your balance is less than, can't request payout", data: { balance } })
        else {
            await payoutDoc.set({
                payoutId: payoutDoc.id,
                payoutTime: Timestamp.fromDate(new Date()),
                amount,
                payoutStatus: 'pending',
                driverId: req.uid,
            })
            res.send({
                message: 'Successfully request payout',
                data: { balanceBefore: balance, balanceAfter: balance - amount },
            })
        }
    } catch (error) {
        console.error(error)
        res.status(500).send({ error })
    }
}

module.exports = {
    getWalletBalance,
    getWalletIncome,
    getWalletExpense,
    getWalletAllData,
    payoutRequest,
}
