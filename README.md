# INFO30005

Required inputs for USER are name&gender.

Required inputs for POST are author,title&content.


- link "/" to welcome page
- link "/api/u/register" to create user with JSON format.
- link "/api/u/all" to get all users files.
- link "/api/search" to ambiguously find user or post with specified keyword.
	Query format:
		POST e.g. /search?type=post&method=author&key=cyclone
		USER e.g. /search?type=user&key=cyclone

- link "/api/p/post" to post with QUERY format.