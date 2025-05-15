import React, { useState, useEffect } from "react";
import Headertop from "./Headertop";
import Beginheader from "./Beginheader";
import Footer from "./Footer";
import Beginfooter from "./Beginfooter";
import { motion } from "framer-motion";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Musterikayit() {
  const [mukellef, setFormData] = useState({
    strName: "",
    strSurname: "",
    strMail: "",
    strGSM: "",
    strAdres: "",
    cmbCargoStatus: "",
  });

  const [musterikayitsehirler, setMusterikayitsehirler] = useState([]);

  useEffect(() => {
    const fetchSehirler = async () => {
      try {
        const response = await fetch(
          "https://private-f738ac-itoapi3.apiary-mock.com/musterikayitsehirler"
        );
        const data = await response.json();
        setMusterikayitsehirler(data.musterikayitsehirlerlist || []);
      } catch (error) {
        console.error("Veriler alınırken hata oluştu:", error);
      }
    };
    fetchSehirler();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...mukellef, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://private-f738ac-itoapi3.apiary-mock.com/mukellef",
        {
          ...mukellef,
        }
      );

      if (response.status === 201) {
        toast.success("İşlem başarılı!", {
          position: "top-right",
          autoClose: 3000,
        });
      }
    } catch (error) {
      console.error("Form gönderilirken hata oluştu:", error);
      toast.error("Bir hata oluştu, tekrar deneyin!", {
        position: "top-right",
        autoClose: 3000,
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
                <a href="form_controls.html">Müşteri Yönetimi</a>
                <i className="fa fa-circle" />
              </li>
              <li className="active">Müşteri Kayıt Formu</li>
            </ul>
            <div className="row">
              <div className="col-md-12">
                <div className="portlet light">
                  <div className="portlet-title">
                    <div className="caption">
                      <span className="caption-subject font-green-sharp bold">
                        Müşteri Kayıt Formu
                      </span>
                    </div>
                  </div>
                  <div className="portlet-body form">
                    <form className="form-horizontal" onSubmit={handleSubmit}>
                      <div className="form-body">
                        <div className="form-group">
                          <label className="col-md-3 control-label">Ad *</label>
                          <div className="col-md-9">
                            <input
                              type="text"
                              name="strName"
                              className="form-control"
                              value={mukellef.strName}
                              onChange={handleChange}
                              required
                            />
                          </div>
                        </div>
                        <div className="form-group">
                          <label className="col-md-3 control-label">
                            Soyad *
                          </label>
                          <div className="col-md-9">
                            <input
                              type="text"
                              name="strSurname"
                              className="form-control"
                              value={mukellef.strSurname}
                              onChange={handleChange}
                              required
                            />
                          </div>
                        </div>
                        <div className="form-group">
                          <label className="col-md-3 control-label">
                            Mail Adresi *
                          </label>
                          <div className="col-md-9">
                            <input
                              type="email"
                              name="strMail"
                              className="form-control"
                              value={mukellef.strMail}
                              onChange={handleChange}
                              required
                            />
                          </div>
                        </div>
                        <div className="form-group">
                          <label className="col-md-3 control-label">GSM</label>
                          <div className="col-md-9">
                            <input
                              type="text"
                              name="strGSM"
                              className="form-control"
                              value={mukellef.strGSM}
                              onChange={handleChange}
                              required
                            />
                          </div>
                        </div>
                        <div className="form-group">
                          <label className="col-md-3 control-label">
                            Adres
                          </label>
                          <div className="col-md-9">
                            <textarea
                              name="strAdres"
                              className="form-control"
                              value={mukellef.strAdres}
                              onChange={handleChange}
                              required
                            ></textarea>
                          </div>
                        </div>
                        <div className="form-group">
                          <label className="col-md-3 control-label">
                            Şehir
                          </label>
                          <div className="col-md-9">
                            <select
                              name="cmbCargoStatus"
                              className="form-control"
                              value={mukellef.cmbCargoStatus}
                              onChange={handleChange}
                              required
                            >
                              <option value="">Seçiniz...</option>
                              {musterikayitsehirler.map((item, index) => (
                                <option key={index} value={item.SehirID}>
                                  {item.SehirAdi}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                        <div className="form-group">
                          <label className="col-md-3 control-label">
                            Cinsiyet
                          </label>
                          <div className="col-md-9">
                            <select className="form-control" required>
                              <option value="">Seçiniz...</option>
                              <option value="">Erkek</option>
                              <option value="">Kadın</option>
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

export default Musterikayit;
