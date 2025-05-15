import React, { useEffect, useState } from "react";
import Headertop from "./Headertop";
import Beginheader from "./Beginheader";
import Footer from "./Footer";
import Beginfooter from "./Beginfooter";
import { motion } from "framer-motion";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Yenisiparis() {
  const [siparisverenler, setSiparisverenler] = useState([]);
  const [urunler, setUrunler] = useState([]);
  const [parabirimleri, setParabirimleri] = useState([]);
  const [formData, setFormData] = useState({
    cargoStatus: "",
    urunID: "",
    adet: "",
    birimFiyat: "",
    toplamFiyat: "",
    paraBirimi: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const parabirimleriRes = await axios.get(
          "https://private-f738ac-itoapi3.apiary-mock.com/parabirimleri"
        );
        setParabirimleri(parabirimleriRes.data.ParaBirimlerilist || []);

        const urunlerRes = await axios.get(
          "https://private-f738ac-itoapi3.apiary-mock.com/urunler"
        );
        setUrunler(urunlerRes.data.Urunlerlist || []);

        const siparisverenlerRes = await axios.get(
          "https://private-f738ac-itoapi3.apiary-mock.com/siparisverenler"
        );
        setSiparisverenler(siparisverenlerRes.data.Siparislist || []);
      } catch (error) {
        console.error("Veri çekme sırasında hata oluştu:", error);
      }
    };
    fetchData();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://private-f738ac-itoapi3.apiary-mock.com/mukellef",
        formData
      );
      if (response.status === 201) {
        toast.success("Sipariş başarıyla kaydedildi!", {
          position: "top-right",
        });
      }
    } catch (error) {
      console.error("Sipariş gönderilirken hata oluştu:", error);
      toast.error("Sipariş kaydedilirken bir hata oluştu!", {
        position: "top-right",
      });
    }
  };

  return (
    <div>
      <ToastContainer />
      <div className="page-header">
        <Headertop />
        <Beginheader />
      </div>
      <div className="page-container">
        <div className="page-content">
          <div className="container">
            <ul className="page-breadcrumb breadcrumb">
              <li>
                <a href="#">Ana Sayfa</a>
                <i className="fa fa-circle" />
              </li>
              <li>
                <a href="FormOrder.html">Sipariş Yönetimi</a>
                <i className="fa fa-circle" />
              </li>
              <li className="active">Yeni Sipariş</li>
            </ul>
            <div className="row">
              <div className="col-md-12">
                <div className="portlet light">
                  <div className="portlet-title">
                    <div className="caption">
                      <span className="caption-subject font-green-sharp bold">
                        Sipariş Kayıt Formu
                      </span>
                    </div>
                  </div>
                  <div className="portlet-body form">
                    <form className="form-horizontal" onSubmit={handleSubmit}>
                      <div className="form-body">
                        <div className="form-group">
                          <label className="col-md-3 control-label">
                            Kargo Durumu
                          </label>
                          <div className="col-md-9">
                            <select
                              className="form-control"
                              name="cargoStatus"
                              value={formData.cargoStatus}
                              onChange={handleChange}
                            >
                              <option value="">Seçiniz...</option>
                              {siparisverenler.map((item) => (
                                <option
                                  key={item.SiparisverenCompanyID}
                                  value={item.SiparisverenCompanyID}
                                >
                                  {item.SiparisverenCompanyName}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                        <div className="form-group">
                          <label className="col-md-3 control-label">
                            Ürün ID
                          </label>
                          <div className="col-md-9">
                            <select
                              className="form-control"
                              name="urunID"
                              value={formData.urunID}
                              onChange={handleChange}
                            >
                              <option value="">Seçiniz...</option>
                              {urunler.map((item) => (
                                <option key={item.UrunID} value={item.UrunID}>
                                  {item.UrunName}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                        <div className="form-group">
                          <label className="col-md-3 control-label">Adet</label>
                          <div className="col-md-9">
                            <input
                              type="number"
                              name="adet"
                              className="form-control"
                              value={formData.adet}
                              onChange={handleChange}
                              placeholder="Adet Bilgisi Giriniz..."
                              required
                            />
                          </div>
                        </div>
                        <div className="form-group">
                          <label className="col-md-3 control-label">
                            Birim Fiyat
                          </label>
                          <div className="col-md-9">
                            <input
                              type="number"
                              name="birimFiyat"
                              className="form-control"
                              value={formData.birimFiyat}
                              onChange={handleChange}
                              placeholder="Birim Fiyatı Giriniz..."
                              required
                            />
                          </div>
                        </div>
                        <div className="form-group">
                          <label className="col-md-3 control-label">
                            Toplam Fiyat
                          </label>
                          <div className="col-md-9">
                            <input
                              type="number"
                              name="toplamFiyat"
                              className="form-control"
                              value={formData.toplamFiyat}
                              onChange={handleChange}
                              placeholder="Toplam Fiyatı Giriniz..."
                              required
                            />
                          </div>
                        </div>
                        <div className="form-group">
                          <label className="col-md-3 control-label">
                            Para Birimi
                          </label>
                          <div className="col-md-9">
                            <select
                              className="form-control"
                              name="paraBirimi"
                              value={formData.paraBirimi}
                              onChange={handleChange}
                            >
                              <option value="">Seçiniz...</option>
                              {parabirimleri.map((item) => (
                                <option
                                  key={item.ParaBirimiID}
                                  value={item.ParaBirimiID}
                                >
                                  {item.ParaBirimiName}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                        <div className="form-actions right">
                          <motion.button
                            type="submit"
                            className="btn green"
                            whileTap={{
                              scale: 0.9,
                              backgroundColor: "red",
                              y: 100,
                            }}
                            transition={{ duration: 0.5 }}
                            onAnimationComplete={(definition) => {
                              if (definition.y === 100) {
                                setTimeout(() => {
                                  definition.y = 0;
                                  definition.backgroundColor = "green";
                                }, 500);
                              }
                            }}
                          >
                            Kaydet
                          </motion.button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <motion.div
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        style={{ position: "absolute", bottom: 0, width: "100%", zIndex: 1000 }}
      >
        <Footer />
        <Beginfooter />
      </motion.div>
    </div>
  );
}
export default Yenisiparis;
