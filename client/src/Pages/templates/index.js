import React, { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { useParams } from "react-router-dom";
import DefaultLayout from "../../Components/DefaultLayout";
import Template1 from "./Template1";
import Template2 from "./Template2";
import { Button } from "antd";
import "../../Styles/Stylesheets/templates.css";

function Templates() {
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  const params = useParams();
  const getTemplate = () => {
    switch (params.id) {
      case "1": {
        return <Template1 />;
      }
      case "2": {
        return <Template2 />;
      }
      default: {
        return <Template1 />;
      }
    }
  };
  return (
    <DefaultLayout>
      <div ref={componentRef}>{getTemplate()}</div>
      <div >
        <Button className="printButton" onClick={handlePrint}>
          Print
        </Button>
      </div>
    </DefaultLayout>
  );
}

export default Templates;
