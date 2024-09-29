var mongoose = require('mongoose')
var staticData = mongoose.Schema({
    id:Number,
    sellerName: {
        type: String,
        trim:true,
        default: 'Hari Priya Globle Enterprises Pvt Ltd Nimrani'
    },
    GSTSeller: {
        type: String,
        trim: true,
        uppercase: true,
        required: true,
        default: '23AADCH7419J1ZK'
    },
    mobileSeller: {
        type: Number,
        maxlength: [10, 'Must be at most 10, got {VALUE}'],
        minlength: [10, 'Must be at least 10, got {VALUE}'],
        trim: true,
        default: 9004425447
    },
    emailSeller: {
        type: String,
        default: 'manoj@haripriyagrp.com'
    },

    streetAddSeller: {
        type: String,
        default: 'Plot No 191/3 Old AB Road Nimrani'
    },
    citySeller: {
        type: String,
        required: true,
        trim: true,
        lowerCase: true,
        default: 'Nimrani'
    },
    tehSeller: {
        type: String,
        required: true,
        trim: true,
        lowerCase: true,
        default: 'Kasarawad'
    },
    distSeller: {
        type: String,
        required: true,
        trim: true,
        lowerCase: true,
        default: 'Khargone'
    },

    pinSeller: {
        type: Number,
        minlength: [6, 'Must be at least 6, got {VALUE}'],
        maxlength: [6, 'Must be at most 6, got {VALUE}'],
        default: 451660
    },
    stateSeller: {
        type: String,
        required: true,
        trim: true,
        lowerCase: true,
        default: 'Madhya Pradesh'
    },
    stateCodeSeller: {
        type: Number,
        required: true,
        default: 23
    },
    countrySeller: {
        type: String,
        default: 'India'
    },
    bankName: {
        type: String,
        default:'State Bank Of India'
    },
    branchName: {
        type: String,
        trim: true,
        default:'Airoli Navi Mumbai'
    },
    AccountNum: {
        type: Number,
        default:'35533135148'
    },
    ifsCode: {
        type:String,
        default:'SBIN0018267'
    },
    panNum: {
        type: String,
        default:'AADCH7419J'
    },
    aadharNum: {
        type: String,
        // default:'34566778976'
    },
    mobNum: {
        type: String,
        default:'8369045099'
    },
    mobNum1: {
        type: String,
        default:'9004425447'
    },
    mobNum2: {
        type: String,
        default:'8866559840'
    },
    headOffice:{
        type:String,
        default:'Shop No A Jay Ganesh CHS.Plot C/8,Sector 3,Airoli Navi Mumbai -400708'
    },
    companyLogo:String,
    companyLogoPath:String,
    CompanyCSTNO:{
        type:String,
        // default:'35533135148'
    },
    CompanyVatTin:{
        type:String,
        // default:'14835533135'
    },
    Description:{
        type:String,
        default:"Dear Sir ," +
            "thank you for the opportunity to provide you with the following quotation Which is Mentioned below:"
    },
    ShortDescription:{
        type:String,
        default:'we assure you best servies always and are loking forward to receiving your valued order'
    },
    YoursFaithfully:{
        type:String,
        default:'Hari Priya Globle Enterprises Pvt Ltd Nimrani'
    }
})


module.exports = staticData

