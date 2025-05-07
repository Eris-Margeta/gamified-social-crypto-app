import { generateValidCode } from "../utils/codegen-helper";

class CodeGenerator {
	private static instance: CodeGenerator;
	private codes: string[] = [];
	private readonly codeLength = 6;
	private readonly historySize = 3;

	private constructor() {
		this.generateCode();
		setInterval(() => this.generateCode(), 60000);
	}

	public static getInstance(): CodeGenerator {
		if (!CodeGenerator.instance) {
			CodeGenerator.instance = new CodeGenerator();
		}
		return CodeGenerator.instance;
	}

	private generateCode(): void {
		const newCode = generateValidCode(this.codeLength);

		this.codes.push(newCode);
		if (this.codes.length > this.historySize) {
			this.codes.shift();
		}

		if (process.env.DEVELOPMENT === "true") {
			console.log(`New code generated: ${newCode}`);
		}
	}

	public getCurrentCode(): string {
		return this.codes[this.codes.length - 1];
	}

	public validateCode(code: string): boolean {
		return this.codes.includes(code);
	}
}

export const codeManager = CodeGenerator.getInstance();
