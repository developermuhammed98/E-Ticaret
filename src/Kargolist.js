import React, { useState, useEffect } from "react";
import axios from "axios";
import Headertop from "./Headertop";
import Beginheader from "./Beginheader";
import Beginpagehead from "./Beginpagehead";
import Footer from "./Footer";
import Beginfooter from "./Beginfooter";
import { motion } from "framer-motion";

function Kargolist() {
  const [cargos, setCargos] = useState([]);

  useEffect(() => {
    const patCargos = async () => {
      try {
        const response = await axios.get(
          "https://private-f2e779-itoapi.apiary-mock.com/cargo"
        );
        setCargos(response.data.Cargos); // JSON verisindeki "Cargos" dizisini state'e kaydediyoruz
      } catch (error) {
        console.error("Kargo verileri alınırken hata oluştu:", error);
      }
    };

    patCargos();
  }, []);

  return (
    <div>
      <div className="page-header">
        {/* BEGIN HEADER TOP */}
        <Headertop />
        {/* END HEADER TOP */}
        {/* BEGIN HEADER MENU */}
        <Beginheader />
        {/* END HEADER MENU */}
      </div>

      <div className="page-container">
        <Beginpagehead />

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
              <li className="active">Kargo Listesi</li>
            </ul>

            <div className="row">
              <div className="col-md-12">
                <div className="portlet light">
                  <div className="portlet-title">
                    <div className="caption">
                      <span className="caption-subject font-green-sharp bold">
                        Kargo Listesi
                      </span>
                    </div>
                    <div className="tools">
                      <a href="javascript:;" className="collapse" />
                    </div>
                  </div>

                  <div className="portlet-body flip-scroll">
                    <table className="table table-bordered table-striped table-condensed flip-content">
                      <thead className="flip-content">
                        <tr>
                          <th width="20%">Sipariş No</th>
                          <th>Kargo Tarihi</th>
                          <th>Teslim Tarihi</th>
                          <th>Kargo Durumu</th>
                          <th>Kargo Firması</th>
                        </tr>
                      </thead>
                      <tbody>
                        {/* Gelen kargo verisini tabloya dökelim */}
                        {cargos.map((item, index) => (
                          <tr key={index}>
                            <td>{item.CargoNo}</td>
                            <td>{item.CargoDate}</td>
                            <td>{item.DeliveryDate}</td>
                            <td>{item.CargoStatus}</td>
                            <td>{item.CargoCompany}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
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
          style={{
            position: "absolute",
            bottom: 0,
            width: "100%",
            zIndex: 1000,
          }}
        >
          <Footer />
          <Beginfooter />
        </motion.div>

        <div className="scroll-to-top">
          <i className="icon-arrow-up" />
        </div>
      </div>
    </div>
  );
}

export default Kargolist;
