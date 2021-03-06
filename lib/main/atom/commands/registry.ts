import * as Atom from "atom"
import {TypescriptServiceClient} from "../../../client/client"
import {RenameView} from "../views/renameView"
import {StatusPanel} from "../../atom/components/statusPanel"
import {TypescriptBuffer} from "../../typescriptBuffer"

export interface Dependencies {
  clearErrors(): void
  getTypescriptBuffer: GetTypescriptBuffer
  getClient(filePath: string): Promise<TypescriptServiceClient>
  renameView: RenameView
  statusPanel: StatusPanel
}

export type GetTypescriptBuffer = (
  filePath: string,
) => Promise<{buffer: TypescriptBuffer; isOpen: boolean}>

export type CommandConstructor = (deps: Dependencies) => (e: Atom.CommandEvent) => void

// To allow using dependency injection, but avoid having to type a lot of boilerplate, we have the
// individual command files register themselves in the below map. When the package is initializing,
// the constructors are passed the deps and return the actual commands handlers.
export const commands: Map<string, CommandConstructor> = new Map()
