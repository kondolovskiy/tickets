import React from "react";
import { TouristView } from "./touristView";
import { UserView } from "./UserView";
import { USER_TYPES } from "../../../constants";

export const TicketViewConfig = {
    [USER_TYPES.TOURIST]: TouristView,
    [USER_TYPES.LOCAL]: UserView
}