import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Headertop from "./Headertop";
import Beginheader from "./Beginheader";
import Footer from "./Footer";
import Beginfooter from "./Beginfooter";

function Yeniurun() {
  const [urunkategorileri, setUrunKategorileri] = useState([]);
  const [parabirimleri, setParabirimleri] = useState([]);
  const [formData, setFormData] = useState({
    urunAdi: "",
    urunID: "",
    kategoriID: "",
    stokDurumu: "",
    fiyat: "",
    paraBirimi: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const kategorilerRes = await axios.get(
          "https://private-f738ac-itoapi3.apiary-mock.com/urunkategorileri"
        );
        setUrunKategorileri(kategorilerRes.data.UrunKategorilerilist || []);

        const parabirimleriRes = await axios.get(
          "https://private-f738ac-itoapi3.apiary-mock.com/parabirimleri"
        );
        setParabirimleri(parabirimleriRes.data.ParaBirimlerilist || []);
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
        toast.success("Ürün başarıyla kaydedildi!", { position: "top-right" });
      }
    } catch (error) {
      console.error("Form gönderilirken hata oluştu:", error);
      toast.error("Ürün kaydedilirken bir hata oluştu!", {
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
                <a href="form_controls.html">Ürün Yönetimi</a>
                <i className="fa fa-circle" />
              </li>
              <li className="active">Yeni Ürün Kayıt</li>
            </ul>

            <div className="row">
              <div className="col-md-12">
                <div className="portlet light">
                  <div className="portlet-title">
                    <div className="caption">
                      <span className="caption-subject font-green-sharp bold">
                        Ürün Kayıt Formu
                      </span>
                    </div>
                  </div>
                  <div className="portlet-body form">
                    <form className="form-horizontal" onSubmit={handleSubmit}>
                      <div className="form-body">
                        <div className="form-group">
                          <label className="col-md-3 control-label">
                            Ürünün Adı *
                          </label>
                          <div className="col-md-9">
                            <input
                              type="text"
                              name="urunAdi"
                              className="form-control"
                              value={formData.urunAdi}
                              onChange={handleChange}
                              placeholder="Ürün Adını Giriniz..."
                              required
                            />
                          </div>
                        </div>

                        <div className="form-group">
                          <label className="col-md-3 control-label">
                            Ürün ID *
                          </label>
                          <div className="col-md-9">
                            <input
                              type="text"
                              name="urunID"
                              className="form-control"
                              value={formData.urunID}
                              onChange={handleChange}
                              placeholder="Ürün ID Giriniz..."
                              required
                            />
                          </div>
                        </div>

                        <div className="form-group">
                          <label className="col-md-3 control-label">
                            Kategori
                          </label>
                          <div className="col-md-9">
                            <select
                              className="form-control"
                              name="kategoriID"
                              value={formData.kategoriID}
                              onChange={handleChange}
                              required
                            >
                              <option value="">Seçiniz...</option>
                              {urunkategorileri.map((item) => (
                                <option
                                  key={item.KategoriID}
                                  value={item.KategoriID}
                                >
                                  {item.KategoriName}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>

                        <div className="form-group">
                          <label className="col-md-3 control-label">
                            Stok Durumu *
                          </label>
                          <div className="col-md-9">
                            <input
                              type="number"
                              name="stokDurumu"
                              className="form-control"
                              value={formData.stokDurumu}
                              onChange={handleChange}
                              placeholder="Stok Durumunu Giriniz..."
                              required
                            />
                          </div>
                        </div>

                        <div className="form-group">
                          <label className="col-md-3 control-label">
                            Fiyat
                          </label>
                          <div className="col-md-9">
                            <input
                              type="number"
                              name="fiyat"
                              className="form-control"
                              value={formData.fiyat}
                              onChange={handleChange}
                              placeholder="Fiyat Bilgisi Giriniz..."
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
                              required
                            >
                              <option value="">Seçiniz...</option>
                              {parabirimleri.map((item) => (
                                <option
                                  key={item.KategoriID}
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

export default Yeniurun;
