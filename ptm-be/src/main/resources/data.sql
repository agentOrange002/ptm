-- FUNCTION: public.show_authorizations_by_user_id(text)

-- DROP FUNCTION public.show_authorizations_by_user_id(text);

CREATE OR REPLACE FUNCTION public.show_authorizations_by_user_id(
	userid text)
    RETURNS TABLE(id bigint, name character varying) 
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE PARALLEL UNSAFE
    ROWS 1000

AS '
declare 
    var_r record;
begin
	for var_r in(
		SELECT DISTINCT(authorities.id),authorities.name
		FROM authorities 
		WHERE authorities.id IN ( 
		SELECT roles_authorities.authorities_id FROM roles_authorities WHERE roles_authorities.roles_id IN (
		SELECT users_roles.roles_id FROM users_roles WHERE users_roles.users_id IN (
		SELECT users.id FROM users WHERE users.user_id = userid)))
		)loop id := var_r.id ; 
			name := var_r.name;
           return next;
	end loop;
end;
';

ALTER FUNCTION public.show_authorizations_by_user_id(text)
    OWNER TO jimboy02;
