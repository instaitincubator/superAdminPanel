import React from "react"

import { getSidebarLayout } from "@/app/layouts/sidebarLayout/sidebarLayout"
import {PaymentsList} from "@/features/payments-list/PaymentsList";

export default function Payments() {
  return <div><PaymentsList/> </div>
}

Payments.getLayout = getSidebarLayout
