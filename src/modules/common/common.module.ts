import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";

@Module({
    imports: [JwtModule],
    providers: [],
    exports: [JwtModule],
})
export class CommonModule {}