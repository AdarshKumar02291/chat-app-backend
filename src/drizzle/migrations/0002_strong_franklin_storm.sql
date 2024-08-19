CREATE TABLE IF NOT EXISTS "chat" (
	"members" text[] DEFAULT ARRAY[]::text[] NOT NULL,
	"timestamp1" timestamp DEFAULT now() NOT NULL
);
