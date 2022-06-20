import { createEvent } from "effector";

import { setupDocument } from "../lib/setup";

export const keyup = createEvent<KeyboardEvent>();
export const keydown = createEvent<KeyboardEvent>();
export const keypress = createEvent<KeyboardEvent>();

setupDocument("keyup", keyup);
setupDocument("keydown", keydown);
setupDocument("keypress", keypress);
