"use client";
import useGlobalData from "@/hooks/get-global";
import React from "react";
import { Box, Typography } from "@mui/material";

// Translate wallet name based on currency
const getWalletName = (currency: string) => {
  switch (currency) {
    case "USD":
      return "Cash USD Wallet";
    case "TRY":
      return "Cash TRY Wallet";
    case "SYP":
      return "ShamCash Wallet";
    default:
      return currency;
  }
};

// Format date using Intl.DateTimeFormat
const formatDate = (dateString: string) => {
  if (!dateString) return "";
  return new Intl.DateTimeFormat("en-GB", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  }).format(new Date(dateString));
};

type Transaction = {
  id: string;
  created_at: string;
  total_amount: number;
  from_currency: string;
};

type ApiResponse = {
  data: Transaction[];
};

function Transactions() {
  const { data, isLoading, isError } = useGlobalData<ApiResponse>({
    dataSourceName: "api/wallets-statistics/outcome",
  });

  if (isLoading) {
    return <Typography>Loading...</Typography>;
  }

  if (isError || !data?.data) {
    return <Typography>Failed to fetch data.</Typography>;
  }

  return (
    <Box sx={{ p: 2, borderRadius: 2 }}>
      {data.data.map((txn: Transaction) => (
        <Box
          key={txn.id}
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            py: 2,
            borderBottom: "1px solid #ccc",
          }}
        >
          {/* Date */}
          <Typography variant="body2" color="textSecondary">
            {formatDate(txn.created_at)}
          </Typography>

          {/* Description */}
          <Typography variant="body1" sx={{ fontWeight: 500 }}>
            Withdraw{" "}
            <span style={{ color: "#0077b6", fontWeight: "bold" }}>{txn.total_amount}</span>{" "}
            from wallet{" "}
            <span style={{ color: "#0077b6", fontWeight: 600 }}>
              {getWalletName(txn.from_currency)}
            </span>
          </Typography>
        </Box>
      ))}
    </Box>
  );
}

export default Transactions;
