"use client";

import PersonOutlined from "@mui/icons-material/PersonOutlined"; // Local CUSTOM COMPONENT
import DashboardHeader from "../../dashboard-header"; // CUSTOM DATA MODEL
import { Box } from "@mui/material";
import Measurements from "../measurements";

// ============================================================
export default function MeasurementEditPageView() {
  return (
    <Box sx={boxStyle}>
      <DashboardHeader 
        Icon={PersonOutlined} 
        title="Measurements" 
        isEdit={true}
        buttonText="Edit" 
        href={`/profile/`}
      />
      <Measurements isEdit={true} />
    </Box>
  )
}

const boxStyle = { 
  padding:'15px',
  borderRadius:'15px',
  background: 'linear-gradient(176.84deg, #B7B7B9 -3.62%, #777777 109.48%)',
  boxShadow: '0px 1px 24px -1px rgba(0, 0, 0, 0.18)',
  backdropFilter: 'blur(12px)',
}