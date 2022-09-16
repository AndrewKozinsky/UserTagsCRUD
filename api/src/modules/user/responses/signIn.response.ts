import { ApiProperty } from '@nestjs/swagger'

export class SignInCreatedResponse {
	@ApiProperty({ example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiIyOWFjMjlmZi04NjBkLTQ4ODAtODUyNC1lNzY4ZWU1OWVmMDUiLCJpYXQiOjE2NjMyOTg1MjgsImV4cCI6MTY2MzI5ODUyOX0.kHAc6raDziQw2MuYKEl8mUrd_B70qjHX5HA8tNVwC20' })
	token: string

	@ApiProperty({ example: '1800' })
	expire: number
}
