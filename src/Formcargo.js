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
  const [cargostatus, setCargostatus] = useState([]);
  const [Kargofirmalari, setKargofirmalari] = useState([]);
  const [Siparisno, setSiparisno] = useState([]);
  const [formData, setFormData] = useState({
    siparisNo: "",
    cargoDate: "",
    deliveryDate: "",
    cargoStatus: "",
    cargoCompany: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const cargostatusRes = await axios.get(
          "https://private-f738ac-itoapi3.apiary-mock.com/cargostatus"
        );
        setCargostatus(cargostatusRes.data.CargoStatusList || []);

        const kargofirmalariRes = await axios.get(
          "https://private-f738ac-itoapi3.apiary-mock.com/kargofirmalari"
        );
        setKargofirmalari(kargofirmalariRes.data.Kargofirmasi || []);

        const siparisnoRes = await axios.get(
          "https://private-f738ac-itoapi3.apiary-mock.com/siparis"
        );
        setSiparisno(siparisnoRes.data.Siparisno || []);
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
              <li className="active">Yeni Kargo</li>
            </ul>
            <div className="row">
              <div className="col-md-12">
                <div className="portlet light">
                  <div className="portlet-title">
                    <div className="caption">
                      <span className="caption-subject font-green-sharp bold">
                        Kargo Kayıt Formu
                      </span>
                    </div>
                  </div>
                  <div className="portlet-body form">
                    <form className="form-horizontal" onSubmit={handleSubmit}>
                      <div className="form-group">
                        <label className="col-md-3 control-label">
                          Sipariş No
                        </label>
                        <div className="col-md-9">
                          <select
                            className="form-control"
                            name="siparisNo"
                            value={formData.siparisNo}
                            onChange={handleChange}
                            required
                          >
                            <option value="">Seçiniz...</option>
                            {Siparisno.map((item) => (
                              <option
                                key={item.SiparisStatusID}
                                value={item.SiparisStatusID}
                              >
                                {item.SiparisStatusName}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                      <div className="form-group">
                        <label className="col-md-3 control-label">
                          Kargo Tarihi
                        </label>
                        <div className="col-md-9">
                          <input
                            type="date"
                            className="form-control"
                            name="cargoDate"
                            value={formData.cargoDate}
                            onChange={handleChange}
                            required
                          />
                        </div>
                      </div>
                      <div className="form-group">
                        <label className="col-md-3 control-label">
                          Teslim Tarihi
                        </label>
                        <div className="col-md-9">
                          <input
                            type="date"
                            className="form-control"
                            name="deliveryDate"
                            value={formData.deliveryDate}
                            onChange={handleChange}
                            required
                          />
                        </div>
                      </div>
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
                            required
                          >
                            <option value="">Seçiniz...</option>
                            {cargostatus.map((item) => (
                              <option
                                key={item.CargoStatusID}
                                value={item.CargoStatusID}
                              >
                                {item.CargoStatusName}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                      <div className="form-group">
                        <label className="col-md-3 control-label">
                          Kargo Firması
                        </label>
                        <div className="col-md-9">
                          <select
                            className="form-control"
                            name="cargoCompany"
                            value={formData.cargoCompany}
                            onChange={handleChange}
                            required
                          >
                            <option value="">Seçiniz...</option>
                            {Kargofirmalari.map((item) => (
                              <option
                                key={item.FirmaCompanyID}
                                value={item.FirmaCompanyID}
                              >
                                {item.FirmaCompanyName}
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
