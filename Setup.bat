@echo off
:: This is just a hand made 'installer' to make easier the use of this little algorithm. To use this, just change the link below (not the branch) to yours

call git clone --branch grupo5 https://github.com/ai-no-yume/TallerReactJSDesarrolloWeb.git
call cd TallerReactJSDesarrolloWeb/
call cd eventsschedule/
call npm install
call npm start
