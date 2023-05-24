const mongoose = require("mongoose");

const configDB = async () => {
  // asinxrom funksiya, await bajarilmagunichakeyingi kodni uqitmasdan dasturni kutishga mmajbur qiladi
  try {
    const conn = await mongoose.connect("mongodb://localhost:27017/tests", {
      useNewUrlParser: true, //agar berilgan manzilda biz aytgan nomli database bulmasa, yangi yaratib beruvchi sozlama
    });
    console.log("data base ulandi: mongodb://localhost:27017/tests"); // database ga ulanganligi bilishimiz uchun consolga chiqarib quyamiz
  } catch (error) {
    console.log(error);
  }
};

module.exports = configDB; // funksiyani export qiladi, istalgan fayimizdan funksiya turgan manzilni ulash orqali funksiyani chaqirib olishimiz mumkin buladi
