/**
 * (C) Copyright 2023 - Devrusty
 * This file is under the GNU General Public License.
 * 
 * This file is responsible for taking the command files from /commands, and allowing them
 * to be used in the InnerOS command line by the end user.
 */

import { CPUProcess } from "../../../hardware/CPU";
import * as fs from "fs";
import * as path from "path";

export interface CommandArgument {
    name: string,
    required: boolean,
    description?: string
}
export type CommandExecute = (args: string[], cmd: string, os: CPUProcess) => void;
export interface Command {
    name: string,
    aliases?: string[],
    description?: string,
    args?: CommandArgument[],
    execute: CommandExecute
}
export let Commands = fs.readdirSync(path.join(__dirname, "/commands"))
    .filter((c) => c.endsWith(".ts"))
    .map((c) => {
        const metadata = require("./commands/" + c).default;
        return (metadata as Command);
    });

export function registerCommand(data: Command) {};