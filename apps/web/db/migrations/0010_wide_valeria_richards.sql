CREATE TABLE "bilibili_credentials" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"sessdata" text NOT NULL,
	"bili_jct" text NOT NULL,
	"buvid3" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "bilibili_credentials" ADD CONSTRAINT "bilibili_credentials_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "bilibili_credentials_userId_idx" ON "bilibili_credentials" USING btree ("user_id");