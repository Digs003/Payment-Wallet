import prisma from "@repo/db/client";
import React from "react";
import { CardsType } from "@prisma/client";
import Link from "next/link";
import { ChevronRight, HomeIcon } from "lucide-react";
import Modal from "../../../components/ui/Modal";
import AllCards from "../../../components/AllCards";
import { getUser } from "../../lib/actions/getUser";

interface CardDashboard {
  card_number: string;
  card_name: string;
  card_cvc: string;
  card_type: CardsType;
  card_expiry: string;
}

async function getCardData() {
  const user=await getUser();
  const cards = await prisma.cards.findMany({
    where: {
      userId: user?.id,
    },
  });
  return cards.map((c: CardDashboard) => ({
    accountNumber: c.card_number,
    cardHolderName: c.card_name,
    cvv: c.card_cvc,
    cardType: c.card_type,
    expiryDate: c.card_expiry,
  }));
}

export default async function () {
  const cardData = await getCardData();

  return (
    <>
      <div>
        <div className="flex items-end justify-between mb-[37px]">
          <div>
            <h2 className="capitalize text-white font-bold text-[28px] leading-[35px] mb-[13px]">
              Your Cards
            </h2>
            <div className="flex items-center text-xs text-gray-400 gap-x-[11px]">
              <div className="flex items-center gap-x-1">
                <HomeIcon size={12} />
                <Link className="capitalize" href="/dashboard">
                  home
                </Link>
              </div>
              <ChevronRight size={14} />
              <span className="capitalize text-red-400">Your Cards</span>
            </div>
          </div>
          <Modal />
        </div>
      </div>

      <AllCards
        cards={cardData.map((card) => ({
          bankName: "HDFC BANK", //Hard Coded Now
          accountNumber: card.accountNumber,
          cardHolderName: card.cardHolderName,
          cvv: card.cvv,
          cardType: card.cardType,
          expiryDate: card.expiryDate,
        }))}
      />
    </>
  );
}
