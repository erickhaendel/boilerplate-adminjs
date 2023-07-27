import { Chip } from "@mui/material";
import { ShowPropertyProps } from "adminjs";
import React from "react";
import VerifiedUser from "@mui/icons-material/Verified";

const VerifyBadge: React.FC<ShowPropertyProps> = (props) => {
  const { record, property } = props;
  const refId = record.params[property.path];
  const populated = record.populated[property.path];
  const value = (populated && populated.title) || refId;

  return (
    <span>
      {value === true ? (
        <VerifiedUser sx={{ color: "#3333F1" }} />
      ) : (
        "Não verficado"
      )}
    </span>
  );

  // return <Chip label={value} color="success"></Chip>;
};

export default VerifyBadge;
