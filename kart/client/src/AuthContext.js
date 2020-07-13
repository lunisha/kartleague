import React, {useEffect, useState} from 'react';

const AuthContext = React.createContext({
    status: false,
    refresh: () => {}
});

export default AuthContext;