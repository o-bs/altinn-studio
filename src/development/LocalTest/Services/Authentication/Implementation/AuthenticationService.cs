using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography.X509Certificates;

using Altinn.Common.AccessTokenClient.Services;

using LocalTest.Services.Authentication.Interface;

using Microsoft.IdentityModel.Tokens;

namespace LocalTest.Services.Authentication.Implementation
{
    public class AuthenticationService : IAuthentication
    {
        private readonly IAccessTokenGenerator _accessTokenGenerator;
        public AuthenticationService(IAccessTokenGenerator accessTokenGenerator)
        {
            _accessTokenGenerator = accessTokenGenerator;
        }
        
        ///<inheritdoc/>
        public string GenerateToken(ClaimsPrincipal principal, int cookieValidityTime)
        {
            List<X509Certificate2> certificates = new List<X509Certificate2>
            {
                new X509Certificate2("jwtselfsignedcert.pfx", "qwer1234") // lgtm [cs/hardcoded-credentials]
            };

            TimeSpan tokenExpiry = new TimeSpan(0, cookieValidityTime, 0);

            JwtSecurityTokenHandler tokenHandler = new JwtSecurityTokenHandler();
            SecurityTokenDescriptor tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(principal.Identity),
                Expires = DateTime.UtcNow.AddSeconds(tokenExpiry.TotalSeconds),
                SigningCredentials = new X509SigningCredentials(certificates[0])
            };

            SecurityToken token = tokenHandler.CreateToken(tokenDescriptor);
            string serializedToken = tokenHandler.WriteToken(token);

            return serializedToken;
        }

        ///<inheritdoc/>
        public string GenerateAccessToken(string issuer, string app)
        {
            string accessToken = _accessTokenGenerator.GenerateAccessToken(
                issuer,
                app,
                new X509Certificate2("jwtselfsignedcert.pfx", "qwer1234")); // lgtm [cs/hardcoded-credentials]

            return accessToken;
        }
    }
}
